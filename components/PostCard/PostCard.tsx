import { Text, Avatar, Group, Box, SimpleGrid, Button, TextInput } from '@mantine/core';
import classes from './PostCard.module.css';
import { Post } from '@/types/types';
import { formatPostedAt } from '@/utils/timeUtils';
import { CommentCard } from '../CommentCard/CommentCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Box className={classes.post} data-testid="post-card">
      <Group align="center" gap="xs">
        <Avatar src={post.author.profilePic} alt="Profile Pic" radius="xl" size={32} />
        <Text size="sm" fw={600}>
          {post.author.firstName} {post.author.lastName}
        </Text>
        <Text size="xs" c="dimmed">
          {formatPostedAt(post.createdAt)}
        </Text>
      </Group>
      <Text mt="xs" size="sm">
        {post.content}
      </Text>
      <Group mt="sm">
        <Button size="compact-xs" radius="md" leftSection={<FontAwesomeIcon icon={faHeart} />}>
          Like
        </Button>
        <Button size="compact-xs" radius="md" leftSection={<FontAwesomeIcon icon={faComment} />}>
          Comment
        </Button>
      </Group>
      <SimpleGrid
        cols={1}
        spacing="lg"
        verticalSpacing={{ base: 'xs' }}
        data-testid="post-feed"
        mt="sm"
      >
        {post.comments && post.comments.length > 0 && (
          <>
            <CommentCard comment={post.comments[0]} />
            <CommentCard comment={post.comments[1]} />
          </>
        )}

        {/* {post.comments?.map((comment: Comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))} */}
      </SimpleGrid>
    </Box>
  );
}
