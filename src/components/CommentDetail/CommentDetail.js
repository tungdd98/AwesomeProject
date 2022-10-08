import React, {memo} from 'react';

import {Text, View} from 'react-native';

const CommentDetail = ({post, setPostHeight}) => {
  return (
    <View
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        setPostHeight(post.id, layout.y);
      }}>
      <Text>
        {post.id}. {post.title}
      </Text>
    </View>
  );
};

export default memo(CommentDetail);
