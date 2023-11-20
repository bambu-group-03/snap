import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, View } from '@/ui';

import type { Message } from './chat-screen';

const messageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

export type MessageType = z.infer<typeof messageSchema>;

export type ChatInputProps = {
  fromId: string;
  toId: string;
  addNewMessage: (newMessage: Message) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({
  fromId,
  toId,
  addNewMessage,
}) => {
  const { control, handleSubmit, reset } = useForm<MessageType>({
    resolver: zodResolver(messageSchema),
  });

  const onSendMessage: SubmitHandler<MessageType> = async (data) => {
    try {
      console.log(`fromId: ${fromId} toId: ${toId} message: ${data.message}`);
      const response = await axios.post(
        'https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/chat/send_message',
        {
          from_id: fromId,
          to_id: toId,
          content: data.message,
        }
      );
      console.log('response code', response.status);
      console.log('response', response.data);
      // Add the new message to the chat screen, TODO: when send a message, response must return the new message
      addNewMessage({
        chat_id: '',
        content: data.message,
        msg_id: '',
        from_id: '',
        to_id: '',
        created_at: '',
      });

      reset(); // Reset the form after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View>
      <View className="flex-2 flex flex-row justify-between text-xs text-gray-400 dark:text-white">
        <ControlledInput
          control={control}
          name="message"
          placeholder="Write your message!"
          className="bg-gray-20 w-full rounded-md py-3 pl-12 text-gray-600 placeholder:text-gray-600 focus:outline-none focus:placeholder:text-gray-400"
        />

        <View className="flex">
          <Button
            variant="icon"
            onPress={handleSubmit(onSendMessage)}
            label={<FontAwesomeIcon icon={faShare} color="red" />}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatInput;
