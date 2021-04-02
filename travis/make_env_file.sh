cd backend/

# Using > to overwrite
echo "PROJECT_NAME=${PROJECT_NAME}\n" > .env

# Using >> to append
echo "SECRET_KEY=${SECRET_KEY}\n" >> .env
echo "REACT_APP_URL=${REACT_APP_URL}\n" >> .env
echo "DEBUG=${DEBUG}\n" >> .env
echo "AWS_S3_REGION_NAME=${AWS_S3_REGION_NAME}\n" >> .env
echo "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}\n" >> .env
echo "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}\n" >> .env
echo "REST_FRAMEWORK_PAGE_SIZE=${REST_FRAMEWORK_PAGE_SIZE}\n" >> .env
echo "REST_FRAMEWORK_MAX_PAGE_SIZE=${REST_FRAMEWORK_MAX_PAGE_SIZE}\n" >> .env
echo "POSTGRES_NAME=${POSTGRES_NAME}\n" >> .env
echo "POSTGRES_USER=${POSTGRES_USER}\n" >> .env
echo "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}\n" >> .env
echo "POSTGRES_HOST=${POSTGRES_HOST}\n" >> .env
echo "POSTGRES_PORT=${POSTGRES_PORT}\n" >> .env
