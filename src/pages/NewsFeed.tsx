import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { format } from 'date-fns';
import { MapIcon, HeartIcon, ChatBubbleLeftIcon, ShareIcon, CameraIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface Comment {
  id: number;
  userId: number;
  username: string;
  content: string;
  timestamp: Date;
  avatar?: string;
}

interface Post {
  id: number;
  userId: number;
  username: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  image?: string;
  location?: string;
  challengeCompleted?: {
    title: string;
    points: number;
  };
  avatar?: string;
  isLiked?: boolean;
}

const NewsFeed = () => {
  // Sample posts data - in a real app, this would come from your backend
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      userId: 1,
      username: 'ElPasoExplorer',
      avatar: 'https://i.pravatar.cc/150?img=1',
      content: 'Just completed the Franklin Mountains challenge! The view from the top is absolutely breathtaking. Swipe to see the panoramic view of El Paso and Ciudad Juárez. 🏔️ #ElPasoScavengerHunt #FranklinMountains',
      timestamp: new Date(2024, 2, 10, 14, 30),
      likes: 15,
      isLiked: false,
      comments: [
        {
          id: 1,
          userId: 2,
          username: 'MountainClimber',
          avatar: 'https://i.pravatar.cc/150?img=2',
          content: 'Congratulations! That\'s not an easy one. The view is totally worth it though!',
          timestamp: new Date(2024, 2, 10, 15, 0),
        },
      ],
      image: 'https://tpwd.texas.gov/state-parks/franklin-mountains/gallery/FMSP_4959.jpg',
      location: 'Franklin Mountains State Park',
      challengeCompleted: {
        title: 'Summit Challenge',
        points: 100,
      },
    },
    {
      id: 2,
      userId: 3,
      username: 'HistoryBuff',
      avatar: 'https://i.pravatar.cc/150?img=3',
      content: 'Found all the historical markers in downtown El Paso. The architecture here is amazing! Did you know the Plaza Theatre opened in 1930? 📚 #ElPasoHistory',
      timestamp: new Date(2024, 2, 9, 16, 45),
      likes: 8,
      isLiked: true,
      comments: [],
      image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/elpaso/plaza_theatre_downtown_el_paso_2_ac124011-c035-489e-ac39-9f81eb2e7931.jpg',
      location: 'Downtown El Paso',
      challengeCompleted: {
        title: 'History Hunter',
        points: 75,
      },
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [activeCommentPost, setActiveCommentPost] = useState<number | null>(null);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
        : post
    ));
  };

  const handleComment = (postId: number) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Math.random(),
      userId: 1,
      username: 'CurrentUser',
      avatar: 'https://i.pravatar.cc/150?img=8',
      content: newComment,
      timestamp: new Date(),
    };

    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));

    setNewComment('');
    setActiveCommentPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">News Feed</h1>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
            <CameraIcon className="h-5 w-5" />
            <span>New Post</span>
          </button>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow">
              {/* Post Header */}
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={post.avatar}
                    alt={post.username}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{post.username}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{format(post.timestamp, 'MMM d, yyyy h:mm a')}</span>
                      {post.location && (
                        <>
                          <span className="mx-1">•</span>
                          <div className="flex items-center">
                            <MapIcon className="h-4 w-4 mr-1" />
                            <span>{post.location}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-gray-900 whitespace-pre-line">{post.content}</p>
                {post.challengeCompleted && (
                  <div className="mt-2 flex items-center bg-green-50 text-green-700 px-3 py-2 rounded-md">
                    <div className="flex-1">
                      <p className="font-medium">Challenge Completed! 🎉</p>
                      <p className="text-sm">{post.challengeCompleted.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">+{post.challengeCompleted.points} points</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Post Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full max-h-96 object-cover"
                />
              )}

              {/* Post Actions */}
              <div className="px-4 py-2 border-t border-b flex space-x-8">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 ${
                    post.isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  {post.isLiked ? (
                    <HeartIconSolid className="h-6 w-6" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                  <span>{post.likes}</span>
                </button>
                <button
                  onClick={() => setActiveCommentPost(post.id)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                >
                  <ChatBubbleLeftIcon className="h-6 w-6" />
                  <span>{post.comments.length}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <ShareIcon className="h-6 w-6" />
                  <span>Share</span>
                </button>
              </div>

              {/* Comments */}
              <div className="p-4 space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <img
                      src={comment.avatar}
                      alt={comment.username}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="flex-1 bg-gray-100 rounded-lg p-3">
                      <p className="font-medium text-sm text-gray-900">
                        {comment.username}
                      </p>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(comment.timestamp, 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                  </div>
                ))}

                {/* New Comment Input */}
                {activeCommentPost === post.id && (
                  <div className="flex space-x-3 mt-4">
                    <img
                      src="https://i.pravatar.cc/150?img=8"
                      alt="Current User"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleComment(post.id);
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default NewsFeed; 