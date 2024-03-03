import { generateClient } from '@aws-amplify/api';
import { getPost } from '@/src/graphql/queries';
import { createPost, updatePost } from '@/src/graphql/mutations';
import { PostDataInput } from '@/types/types';
import { HttpError } from '@/src/models/error/HttpError';

const client = generateClient();

export const getPostAPI = async (postId: string) => {
    try {
    const post = await client.graphql({
        query: getPost,
        variables: { id: postId },
    });
    return post.data.getPost;
    } catch (error: any) {
        throw new HttpError(`Error retrieving post: ${error.message}`, error.statusCode || 500);
    }
};

export const createNewPostAPI = async (postData: PostDataInput) => {
    try {
    const post = await client.graphql({
        query: createPost,
        variables: { input: postData },
    });
    return post.data.createPost;
    } catch (error: any) {
        throw new HttpError(`Error creating post: ${error.message}`, error.statusCode || 500);
    }
};

export const getCommunityPostsAPI = async (communityId: string) => {
    const getCommunityPosts = /* GraphQL */ `
    query GetCommunityPosts($communityId: ID!) {
      getCommunity(id: $communityId) {
        id
        posts {
          items {
            id
            author {
              username
              firstName
              lastName
              profilePic
            }
            content
            updatedAt
            createdAt
            userPostsId
            visibility
            likedBy {
              items {
                userId
                user {
                  username
                  profilePic
                }
              }
            }
          }
        }
      }
    }
  `;
    try {
        const response = await client.graphql({
            query: getCommunityPosts,
            variables: { communityId },
          });
          return response;
    } catch (error: any) {
        throw new HttpError(`Error retrieving community posts: ${error.message}`, error.statusCode || 500);
    }
};

export const updatePostImageAPI = async (postId: string, image: string) => {
  const input = { id: postId, images: [image] };
    try {
        const updatedPost = await client.graphql({
        query: updatePost,
        variables: { input },
        });
        console.log('User updated successfully:', updatedPost.data.updatePost);
        return updatedPost.data.updatePost;
    } catch (error: any) {
        throw new HttpError(`Error updating post image: ${error.message}`, error.statusCode || 500);
    }
};
