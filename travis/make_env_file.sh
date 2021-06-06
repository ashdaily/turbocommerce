cd backend/

# Using > to overwrite
echo "PROJECT_NAME=${PROJECT_NAME}" > .env.local

# Using >> to append
echo "SECRET_KEY=${SECRET_KEY}" >> .env.local
echo "ALLOWED_HOSTS=*" >> .env.local
echo "REACT_APP_URL=${REACT_APP_URL}" >> .env.local
echo "DEBUG=${DEBUG}" >> .env.local
echo "AWS_S3_REGION_NAME=${AWS_S3_REGION_NAME}" >> .env.local
echo "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}" >> .env.local
echo "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}" >> .env.local
echo "REST_FRAMEWORK_PAGE_SIZE=${REST_FRAMEWORK_PAGE_SIZE}" >> .env.local
echo "REST_FRAMEWORK_MAX_PAGE_SIZE=${REST_FRAMEWORK_MAX_PAGE_SIZE}" >> .env.local
echo "POSTGRES_NAME=${POSTGRES_NAME}" >> .env.local
echo "POSTGRES_USER=${POSTGRES_USER}" >> .env.local
echo "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}" >> .env.local
echo "POSTGRES_HOST=${POSTGRES_HOST}" >> .env.local
echo "POSTGRES_PORT=${POSTGRES_PORT}" >> .env.local
