FROM php:8.3.14-apache
COPY index.php health /var/www/html/
EXPOSE 80
