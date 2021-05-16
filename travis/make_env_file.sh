cd backend/

# Using > to overwrite
echo "PROJECT_NAME=${PROJECT_NAME}" > .env

# Using >> to append
echo "SECRET_KEY=${SECRET_KEY}" >> .env
echo "ALLOWED_HOSTS=*" >> .env
echo "REACT_APP_URL=${REACT_APP_URL}" >> .env
echo "DEBUG=${DEBUG}" >> .env
echo "AWS_S3_REGION_NAME=${AWS_S3_REGION_NAME}" >> .env
echo "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}" >> .env
echo "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}" >> .env
echo "REST_FRAMEWORK_PAGE_SIZE=${REST_FRAMEWORK_PAGE_SIZE}" >> .env
echo "REST_FRAMEWORK_MAX_PAGE_SIZE=${REST_FRAMEWORK_MAX_PAGE_SIZE}" >> .env
echo "POSTGRES_NAME=${POSTGRES_NAME}" >> .env
echo "POSTGRES_USER=${POSTGRES_USER}" >> .env
echo "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}" >> .env
echo "POSTGRES_HOST=${POSTGRES_HOST}" >> .env
echo "POSTGRES_PORT=${POSTGRES_PORT}" >> .env
