<?php
// Brown Pixels contact endpoint.
// For production on shared hosting, configure your domain's mail DNS and use a real mailbox.
// This endpoint sends enquiries to the Brown Pixels inbox requested for the site.

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}

// Simple honeypot. Bots should leave this empty.
if (!empty($data['website'])) {
    echo json_encode(['success' => true, 'message' => 'Thanks.']);
    exit;
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$company = trim((string)($data['company'] ?? ''));
$budget = trim((string)($data['budget'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

if ($name === '' || mb_strlen($name) > 80) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid name.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 120) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}
if ($message === '' || mb_strlen($message) > 2500) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please add a short project brief.']);
    exit;
}

$to = 'brownpixels.co@gmail.com';
$siteHost = $_SERVER['HTTP_HOST'] ?? 'yourdomain.com';
$fromDomain = preg_replace('/[^a-zA-Z0-9.\-]/', '', $siteHost);
$from = 'website@' . ($fromDomain ?: 'yourdomain.com');

// Prevent header injection if a field is ever changed in the future.
$name = str_replace(["\r", "\n"], ' ', $name);
$email = str_replace(["\r", "\n"], ' ', $email);
$company = str_replace(["\r", "\n"], ' ', $company);
$budget = str_replace(["\r", "\n"], ' ', $budget);

$subject = 'New Brown Pixels enquiry — ' . $name;
$body = "New project enquiry\n\n"
    . "Name: {$name}\n"
    . "Email: {$email}\n"
    . "Company: " . ($company ?: 'Not provided') . "\n"
    . "Budget: " . ($budget ?: 'Not provided') . "\n\n"
    . "Project brief:\n{$message}\n";

$headers = [
    'From: Brown Pixels Website <' . $from . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'MIME-Version: 1.0'
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail could not be sent from the server. Please email brownpixels.co@gmail.com directly.']);
    exit;
}

echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
