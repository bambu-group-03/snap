import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { Alert } from 'react-native';

import type { Snap } from '@/api';
import {
  useAddReply,
  useDeleteSnapMutation,
  useUpdateSnapMutation,
} from '@/api';
import { getUserState } from '@/core';
import { Button, TextInput, TouchableOpacity, View } from '@/ui';

import { Card } from '../feed/card';
import { CommentInput } from './comment-component';
import { Comments } from './comment-list';

export const SnapView = ({ snap }: { snap: Snap }) => {
  const currentUser = getUserState();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(snap.content);
  const updateSnapMutation = useUpdateSnapMutation();
  const deleteSnapMutation = useDeleteSnapMutation();
  const { mutate: addReply } = useAddReply();

  const isOwner = snap.author === currentUser?.id;

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    updateSnapMutation.mutate({
      snap_id: snap.id,
      content: editedContent,
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
          privacy: 1, // Assuming SNAP_VISIBLE is equal to 1
        },
        {
          onSuccess: () => {
            showMessage({
              message: 'Reply added successfully',
              type: 'success',
            });
          },
          onError: () => {
            showErrorMessage('Error adding reply');
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
            <TouchableOpacity onPress={handleEdit} className="...">
              <FontAwesomeIcon icon={faEdit} size={15} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} className="...">
              <FontAwesomeIcon icon={faTrash} size={15} color="red" />
            </TouchableOpacity>
          </View>
        )}
        {editMode ? (
          <CommentInput
            placeholder="Edit your snap..."
            onSubmit={handleSubmit}
            initialContent={editedContent}
            onContentChange={setEditedContent}
          />
        ) : (
          <CommentInput
            placeholder="Write a reply..."
            onSubmit={handleSubmit}
          />
        )}
        <Comments snap={snap} />
      </View>
    </>
  );
};
