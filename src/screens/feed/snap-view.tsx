import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message'; // Correct import for showMessage

import type { Snap } from '@/api';
import {
  useAddReply,
  useDeleteSnapMutation,
  useUpdateSnapMutation,
} from '@/api';
import { getUserState } from '@/core';
import { TouchableOpacity, View } from '@/ui';

import { Card } from '../feed/card';
import { CommentInput } from './comment-component';
import { Comments } from './comment-list';

export const SnapView = ({ snap }: { snap: Snap }) => {
  const currentUser = getUserState();
  const [editMode, setEditMode] = useState<boolean>(false);
  const updateSnapMutation = useUpdateSnapMutation();
  const deleteSnapMutation = useDeleteSnapMutation();
  const { mutate: addReply } = useAddReply();

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
      { text: 'OK', onPress: () => deleteSnapMutation.mutate(snap.id) },
    ]);
  };

  const handleSubmit = (data: { content: string }) => {
    if (editMode) {
      handleSaveEdit(data);
    } else {
      addReply(
        {
          ...data,
          user_id: currentUser?.id,
          parent_id: snap.id,
          privacy: 1,
        },
        {
          onSuccess: () => {
            showMessage({
              message: 'Reply added successfully',
              type: 'success',
            });
          },
          onError: () => {
            showMessage({
              message: 'Error adding reply',
              type: 'danger',
            });
          },
        }
      );
    }
  };

  return (
    <>
      <View>
        <Card snap={snap} />
        {isOwner && !editMode && (
          <View className="my-2 flex flex-row justify-around">
            <TouchableOpacity
              onPress={handleEdit}
              className="rounded-full  border border-gray-300 px-3 py-2 text-center font-bold text-white"
            >
              <FontAwesomeIcon icon={faEdit} size={13} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              className="rounded-full  border border-gray-300 px-3 py-2 text-center font-bold text-white"
            >
              <FontAwesomeIcon icon={faTrash} size={13} color="red" />
            </TouchableOpacity>
          </View>
        )}
        <CommentInput
          placeholder={editMode ? 'Edit your snap...' : 'Write a reply...'}
          onSubmit={handleSubmit}
          initialContent={editMode ? snap.content : ''}
        />
        <Comments snap={snap} />
      </View>
    </>
  );
};
