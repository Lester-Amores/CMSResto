# stage 1: build stage
FROM php:8.2-fpm-alpine AS build

# Install system dependencies and PHP extensions
RUN apk add --no-cache \
    zip \
    libzip-dev \
    freetype \
    libjpeg-turbo \
    libpng \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    nodejs \
    npm \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip pdo pdo_mysql \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable gd

# Install Composer
COPY --from=composer:2.7.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy necessary files and change permissions
COPY . .

# Set permissions for the copied files
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Install PHP and Node.js dependencies
RUN composer install --prefer-dist \
    && npm install \
    && npm run build

# Set permissions for the vendor directory
RUN chown -R www-data:www-data /var/www/html/vendor \
    && chmod -R 775 /var/www/html/vendor

# stage 2: production stage
FROM php:8.2-fpm-alpine

# Install necessary packages and nginx
RUN apk add --no-cache \
    zip \
    libzip-dev \
    freetype \
    libjpeg-turbo \
    libpng \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    oniguruma-dev \
    gettext-dev \
    freetype-dev \
    nginx \
    bash \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip pdo pdo_mysql \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable gd \
    && docker-php-ext-install bcmath \
    && docker-php-ext-enable bcmath \
    && docker-php-ext-install exif \
    && docker-php-ext-enable exif \
    && docker-php-ext-install gettext \
    && docker-php-ext-enable gettext \
    && docker-php-ext-install opcache \
    && docker-php-ext-enable opcache \
    && rm -rf /var/cache/apk/*

# Copy files from the build stage
COPY --from=build /var/www/html /var/www/html

# Copy the nginx configuration
COPY ./.deploy/nginx.conf /etc/nginx/http.d/default.conf

# Copy the php.ini configuration from .deploy folder to the PHP conf.d directory
COPY ./.deploy/php.ini "$PHP_INI_DIR/conf.d/app.ini"

WORKDIR /var/www/html

# Add all folders where files are being stored that require persistence
VOLUME ["/var/www/html/storage/app/public"]
VOLUME ["/var/www/html/storage/app/private"]

# Ensure proper permissions in production
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Create a storage link
RUN php artisan storage:link

# Command to start nginx and php-fpm
CMD ["sh", "-c", "chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache && nginx && php-fpm"]