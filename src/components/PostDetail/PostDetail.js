/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {View, ScrollView, Button} from 'react-native';
import CommentDetail from '../CommentDetail/CommentDetail';

const PostDetail = () => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [isScrollToComment, setIsScrollToComment] = useState(false);

  const postsHeightRef = useRef({});
  const postsContainerRef = useRef(null);

  const postIdNeedScroll = '50';

  const refreshData = useCallback(() => {
    setPosts([]);
    setCount(0);
    setIsScrollToComment(false);
    postsHeightRef.current = {};

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        setPosts(responseJson);
        postsHeightRef.current = responseJson.reduce((prevValue, value) => {
          return {
            ...prevValue,
            [value.id]: 0,
          };
        }, {});
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const setPostHeight = useCallback((postId, height) => {
    if (postId in postsHeightRef.current) {
      postsHeightRef.current[postId] = height;
      setCount(prev => prev + 1);
    }
  }, []);

  const scrollHandler = useCallback(() => {
    if (postsContainerRef.current) {
      postsContainerRef.current.scrollTo({
        x: 0,
        y: postsHeightRef.current[postIdNeedScroll],
        animated: true,
      });
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    if (
      postIdNeedScroll in postsHeightRef.current &&
      postsHeightRef.current[postIdNeedScroll] &&
      !isScrollToComment
    ) {
      scrollHandler();
      setIsScrollToComment(true);
    }
  }, [count, isScrollToComment, scrollHandler]);

  return (
    <View>
      <Button
        onPress={() => {
          refreshData();
        }}
        title="Refresh data"
        color="#841584"
      />
      <Button
        onPress={() => {
          scrollHandler();
        }}
        title="Scroll handle"
        color="#abab34"
      />
      <Button
        onPress={() => {
          console.log(postsHeightRef.current);
        }}
        title="Show log"
        color="#34abaa"
      />
      <View style={{marginTop: 20}}>
        <ScrollView ref={postsContainerRef}>
          {posts.map(post => (
            <CommentDetail
              key={post.id}
              post={post}
              setPostHeight={setPostHeight}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default PostDetail;
