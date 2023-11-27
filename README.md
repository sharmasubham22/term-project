# Find the Labels

“Find the Labels” is an image storage and analysis system which can store images in a database, display the images in a gallery format and then detect the labels which can be found in an image selected by the user based on the confidence level they select.
  

## Architecture

![enter image description here](https://drive.google.com/uc?export=view&id=1MoeyBl6Zlfk4n9DRN8VGUkReyrFy-Jcy)

This project follows a “rapid provisioning architecture” which is an architectural pattern. It automatically and quickly provisions resources for different services or applications. This type of architecture is agile and flexible. They are consistent, cost efficient, provide security etc.

## Project Screenshots

### 1. Sign up and email verification

AWS Cognito is a user authentication service and identity management service. It provides services for user to sign up, sign in and manage the control of applications. With a simple setup, the application can be made secure and be accessible with authentication only.

![Signup page](https://drive.google.com/uc?export=view&id=11_hu5qlPq3Us_nrW7f0uRwM4BPtmRqf5)
![email verification prompt](https://drive.google.com/uc?export=view&id=14Dd-82wFrf1hzOk02ppHMA_kYdfS4Fw7)

### 2. Image upload to S3 bucket and fetch

AWS S3 Bucket provides a highly scalable object storage service. When compared to DynamoDB or any other service to use for storage, it couldn’t be possible to use as others store the data in a structured manner. Images can be sent as an object to be stored in a database and S3 provides that option.

![image upload success](https://drive.google.com/uc?export=view&id=1ThLH3zJHgJ8jH3d6KtS006Jqv5FbY1Sw)
![fetched images](https://drive.google.com/uc?export=view&id=13H3khN9t9qFSIuzdCSXHWGZmAkCpyga3)

### 3. Get labels from the image

AWS Rekognition is a fully managed computer vision service which can identify and analyze labels, scenes, face expressions, faces on any video or image. It is a complete serverless service which can be called from a lambda function and analyze any image. It comprises of set of APIs which can detect labels of an image or a video.

![set confidence level and execute](https://drive.google.com/uc?export=view&id=1G2oVs-tZFMJV1SlDZbd3SF8ysRFGyhls)
![executed labels](https://drive.google.com/uc?export=view&id=1kdG3_WvkxgR7MHrqbq8TFhHXKZUDzpBz)

Also used AWS API Gateway for creating and managing APIs for my application. It is a fully managed service which is provided by AWS.

For the computing services, AWS Lambda and AWS EC2 is used. AWS Lambda is a serverless computing service. It lets developers to run their code without having to worry about managing server. AWS EC2 is a resizable compute service which can help create virtual machine or instances to run applications on it. It can be launched in just a few minutes and can be customized according to developer’s requirements.

## Deployment Model:

Amazon’s AWS follows a public cloud deployment model. A public cloud is a cloud computing model in which the organizations own the cloud services and infrastructure and then provides it to the public for their use. The services that this project used is owned by Amazon and they have provided these services for the project.

## References

[1] “Amazon AWS.” [https://us-east-1.console.aws.amazon.com](https://us-east-1.console.aws.amazon.com)
