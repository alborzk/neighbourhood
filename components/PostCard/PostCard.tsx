import {
  Text,
  Avatar,
  Group,
  Box,
  SimpleGrid,
  Button,
  Collapse,
  TextInput,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Post } from '@/types/types';
import { formatPostedAt } from '@/utils/timeUtils';
import { CommentCard } from '@/components/CommentCard/CommentCard';
import classes from './PostCard.module.css';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [commentOpened, { toggle: toggleComment }] = useDisclosure(false);
  const [likeOpened, { toggle: toggleLike }] = useDisclosure(false);
  const handleLike = () => {
    //Mutation to like post
    toggleLike();
  };

  const handlePostComment = () => {
    //Run comment validation
    //Mutation to create comment and add to post
    toggleComment();
  };

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
        <Button
          size="xs"
          radius="md"
          variant={likeOpened ? 'outline' : 'filled'}
          leftSection={<FontAwesomeIcon icon={faHeart} />}
          onClick={handleLike}
        >
          {likeOpened ? 'Liked' : 'Like'}
        </Button>
        <Button
          size="xs"
          radius="md"
          variant={commentOpened ? 'outline' : 'filled'}
          leftSection={<FontAwesomeIcon icon={faComment} />}
          onClick={toggleComment}
        >
          Comment
        </Button>
      </Group>
      <Collapse in={commentOpened} mt="sm">
        <Box w={350}>
          <TextInput
            radius="lg"
            size="sm"
            placeholder="Write a comment..."
            rightSectionWidth={42}
            rightSection={
              <ActionIcon
                size={24}
                radius="xl"
                color="dark.6"
                variant="light"
                onClick={handlePostComment}
              >
                <FontAwesomeIcon size="xs" icon={faArrowRight} />
              </ActionIcon>
            }
          />
        </Box>
      </Collapse>

      <SimpleGrid
        cols={1}
        spacing="lg"
        verticalSpacing={{ base: 'xs' }}
        data-testid="post-feed"
        mt="sm"
      >
        {post.comments &&
          post.comments.length > 0 &&
          post.comments.map((comment) => <CommentCard key={comment.id} comment={comment} />)}
      </SimpleGrid>
    </Box>
  );
}
