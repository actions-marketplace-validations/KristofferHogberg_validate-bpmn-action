# Use an official Node.js image as the base image
FROM node:18.17.0

# Install bpmnlint globally
RUN npm install -g bpmnlint

# Set the working directory
WORKDIR /app

# Set an environment variable
ENV CUSTOM_RULES_FOLDER /app/custom_rules

# Copy your custom rules folder into the container
COPY custom_rules /app/custom_rules

# Define the command to run when the container starts
CMD ["bpmnlint"]
