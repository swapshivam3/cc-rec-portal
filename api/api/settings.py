"""
Django settings for api project.

Generated by 'django-admin startproject' using Django 3.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
import os
from datetime import datetime
from dateutil import tz
# import jsonfielsd
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'mtog44-yzo9ad#_z&78g&y^7@j7x_xik+5ih#6w8ic-ftsk21u'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    # Core
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    # Apps (Modules)
    'rest_framework',
    'rest_framework.authtoken',
    'blog.apps.BlogConfig',
    'exam.apps.ExamConfig',
    'main.apps.MainConfig',
    'recruitment.apps.RecruitmentConfig',
    'users.apps.UsersConfig',
    'corsheaders',
    'jsonfield',
    'rest_auth',
    
    'allauth',
    'allauth.account',
    'rest_auth.registration',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google'
]
SITE_ID = 1


# For Production Only
REST_FRAMEWORK = {
#     'DEFAULT_RENDERER_CLASSES': (
#        'rest_framework.renderers.JSONRenderer',
#    )
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication', # <-- set this class
    ],
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:8080",
#     "http://127.0.0.1:9000",
#     "https://www.cc-recruitments.tech",
#     "https://cc-recruitments.tech",
#     "https://api.cc-recruitments.tech",
#     "http://localhost:3000",
#     "http://cc-api.eastus.cloudapp.azure.com",
#     "https://cc-api.eastus.cloudapp.azure.com"
# ]

CSRF_COOKIE_DOMAIN = ".cc-recruitments.tech"
SESSION_COOKIE_DOMAIN = ".cc-recruitments.tech"
CSRF_TRUSTED_ORIGINS = ".cc-recruitments.tech"


ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'api.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

#DATABASES = {
 #   'default': {
 #       'ENGINE': 'django.db.backends.sqlite3',
 #       'NAME': BASE_DIR / 'db.sqlite3',
  #  }
#}
DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.postgresql_psycopg2',
		'NAME': 'ccdb',
		'USER': 'ccadmin',
		'PASSWORD': 'MP3@Aqp2zp7fZ34',
		'HOST' :'localhost',
		'PORT' :''
	}
}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')

AUTH_USER_MODEL = 'users.CustomUser'
AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    "allauth.account.auth_backends.AuthenticationBackend",

)

ACCOUNT_DEFAULT_HTTP_PROTOCOL = "http"

REST_AUTH_SERIALIZERS = {
    'TOKEN_SERIALIZER': 'users.serializers.TokenSerializer',
 }


EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST='smtp.gmail.com'
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=os.environ.get('EMAIL_USER')
EMAIL_HOST_PASSWORD=os.environ.get('EMAIL_PASS')

AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = "cc-quiz"
# print(AWS_ACCESS_KEY_ID)
# AWS_S3_SIGNATURE_VERSION = 's3v4'
# S3_USE_SIGV4 = True
AWS_S3_ADDRESSING_STYLE = "virtual"
AWS_S3_REGION_NAME = "ap-south-1"
AWS_S3_FILE_OVERWRITE = True
AWS_DEFAULT_ACL = None
AWS_S3_VERIFY = True
AWS_QUERYSTRING_EXPIRE=86400
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
# below is year month day hour(INPUT IN 24 HOUR) minute second microsecond tzinfo 
START_TIME=datetime(2022,1,30,20,29,0,0,tz.gettz('Asia/Calcutta')).timestamp()
START_BUFFER_TIME=datetime(2022,1,30,20,35,0,0,tz.gettz('Asia/Calcutta')).timestamp()
