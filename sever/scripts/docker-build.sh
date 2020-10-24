# Creates a new version of your image and tags it with a version provided as an argument
# as well as the `latest` tag.
# Example usage:
# `bash scripts/docker-build.sh v1.0.0`

# Pass the version as an argument to this script
if [[ -z "$1" ]]; then
    echo "Please provide a version for this image."
    exit 1
fi

version=$1

echo "Building new image with tag: $verson"

docker build --tag donnyroufs/leaguedex:$version --tag donnyroufs/leaguedex:latest .
