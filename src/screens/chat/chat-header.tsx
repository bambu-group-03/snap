import React from 'react';

import { Image, Text, View } from '@/ui';

import type { ChatBase } from './chat-list-screen';

const ChatHeader = ({ chatUser }: { chatUser: ChatBase }) => {
  // const profile_photo =
  //   'https://avatars.githubchatUsercontent.com/u/40549839?s=400&u=f9968082a38e11cabaeec2033e3ffb3e18395eb6&v=4';

  return (
    <View className="flex justify-between border-b-2 border-gray-200 py-3 sm:items-center">
      <View className="relative flex items-center space-x-4">
        <View className="relative">
          <Image
            source={chatUser.imageSource} //{chatUser.imageSource}//"https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            className="h-10 w-10 rounded-full sm:h-16 sm:w-16"
          />
        </View>
        <View className="flex flex-col leading-tight">
          <View className="mt-1 flex items-center text-2xl">
            <Text className="mr-3 text-gray-700">
              {chatUser.firstName} {chatUser.lastName}
            </Text>
          </View>
          <Text className="text-lg text-gray-600">{chatUser.bio}</Text>
        </View>
      </View>
      {/* <View className="flex items-center space-x-2">
            <Button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </Button>
            <Button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </Button>
            <Button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </Button>
          </View> */}
    </View>
  );
};

export default ChatHeader;
