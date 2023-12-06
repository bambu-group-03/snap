import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert } from 'react-native';

import type { Snap } from '@/api';
import {
  useAddReplyMutation,
  useDeleteSnapMutation,
  useUpdateSnapMutation,
} from '@/api'; // Updated import to useAddReplyMutation
import { getUserState } from '@/core';
import { TouchableOpacity, View } from '@/ui';

import { Card } from '../feed/card';
import { CommentInput } from './comment-component';
import { Comments } from './comment-list';

export const SnapView = ({ snap }: { snap: Snap }) => {
  const currentUser = getUserState();
  const [editMode, setEditMode] = useState<boolean>(false);
  const updateSnapMutation = useUpdateSnapMutation();
  const deleteSnapMutation = useDeleteSnapMutation(currentUser!.id);
  const addReplyMutation = useAddReplyMutation(); // Use the new useAddReplyMutation
  const { navigate } = useNavigation(); // Use the useNavigation hook

  const isOwner = snap.author === currentUser?.id;

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveEdit = (data: { content: string }) => {
    updateSnapMutation.mutate({
      snap_id: snap.id,
      content: data.content,
      user_id: currentUser!.id,
    });
    setEditMode(false);
  };

  const handleDelete = () => {
    Alert.alert('Delete Snap', 'Are you sure you want to delete this snap?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => {
          deleteSnapMutation.mutate(snap.id);
          navigate('Feed');
        },
      },
    ]);
  };

  const handleSubmit = (data: { content: string }) => {
    if (editMode) {
      handleSaveEdit(data);
    } else {
      addReplyMutation.mutate({
        ...data,
        user_id: currentUser?.id,
        parent_id: snap.id,
        privacy: 1,
      });
    }
  };

  return (
    <>
      <View>
        <Card snap={snap} />
        <View className="flex flex-row items-start">
          <View className="ml-2 h-[280] w-0.5 bg-gray-300" />
          <View className="grow">
            {isOwner && !editMode && (
              <View className="my-2 flex flex-row justify-around">
                <TouchableOpacity
                  onPress={handleEdit}
                  className="rounded-full border border-gray-300 px-3 py-2 text-center font-bold text-white"
                >
                  <FontAwesomeIcon icon={faEdit} size={13} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDelete}
                  className="rounded-full border border-gray-300 px-3 py-2 text-center font-bold text-white"
                >
                  <FontAwesomeIcon icon={faTrash} size={13} color="red" />
                </TouchableOpacity>
              </View>
            )}
            <View className="m-3 mr-5 rounded-3xl border border-gray-200">
              <CommentInput
                placeholder={
                  editMode ? 'Edit your snap...' : 'Write a reply...'
                }
                onSubmit={handleSubmit}
                initialContent={editMode ? snap.content : ''}
              />
            </View>
            <Comments snap={snap} />
          </View>
        </View>
      </View>
    </>
  );
};
