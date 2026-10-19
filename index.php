<?php
$msg = getenv('FIXTURE_MESSAGE') ?: '(unset)';
echo "<h1>fixture php-apache OK</h1><p>message: " . htmlspecialchars($msg) . "</p>";
