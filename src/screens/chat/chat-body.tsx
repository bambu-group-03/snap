import React from 'react';

import { Button, Image, Text, View } from '@/ui';
import { ChatBase } from './chat-list-screen';

const MY_PROFILE_PHOTO =
  'https://avatars.githubusercontent.com/u/40549839?s=400&u=f9968082a38e11cabaeec2033e3ffb3e18395eb6&v=4';

const ChatBody = ({ chatUser }: { chatUser: ChatBase }) => {
  return (
    <View>
      <View
        id="messages"
        className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col space-y-4 overflow-y-auto p-3"
      >
        <View className="chat-message">
          <View className="flex items-end">
            <View className="order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 text-xs">
              <View>
                <Text className="inline-block rounded-lg rounded-bl-none bg-gray-300 px-4 py-2 text-gray-600">
                  Can be verified on any platform using docker
                </Text>
              </View>
            </View>
            <Image
              source={MY_PROFILE_PHOTO} //"https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              className="order-1 h-6 w-6 rounded-full"
            />
          </View>
        </View>
        <View className="chat-message">
          <View className="flex items-end justify-end">
            <View className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-xs">
              <View>
                <Text className="inline-block rounded-lg rounded-br-none bg-blue-600 px-4 py-2 text-white ">
                  Your error message says permission denied, npm global installs
                  must be given root privileges.
                </Text>
                <Image
                  source={chatUser.imageSource} //"https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  className="order-2 h-6 w-6 rounded-full"
                />
              </View>
            </View>
          </View>
        </View>
        <View className="chat-message">
          <View className="flex items-end">
            <View className="order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 text-xs">
              <View>
                <Text className="inline-block rounded-lg bg-gray-300 px-4 py-2 text-gray-600">
                  Command was run with root privileges. I'm sure about that.
                </Text>
              </View>
              <View>
                <Text className="inline-block rounded-lg bg-gray-300 px-4 py-2 text-gray-600">
                  I've update the description so it's more obviously now
                </Text>
              </View>
              <View>
                <Text className="inline-block rounded-lg bg-gray-300 px-4 py-2 text-gray-600">
                  FYI https://askubuntu.com/a/700266/510172
                </Text>
              </View>
              <View>
                <Text className="inline-block rounded-lg rounded-bl-none bg-gray-300 px-4 py-2 text-gray-600">
                  Check the line above (it ends with a # so, I'm running it as
                  root )
                </Text>
              </View>
            </View>
            <Image
              source={MY_PROFILE_PHOTO} //"https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              className="order-1 h-6 w-6 rounded-full"
            />
          </View>
        </View>
        <View className="chat-message">
          <View className="flex items-end justify-end">
            <View className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-xs">
              <View>
                <Text className="inline-block rounded-lg rounded-br-none bg-blue-600 px-4 py-2 text-white ">
                  Any updates on this issue? I'm getting the same error when
                  trying to install devtools. Thanks
                </Text>

                <Image
                  source={chatUser.imageSource} //"https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  className="order-2 h-6 w-6 rounded-full"
                />
              </View>
            </View>
          </View>
        </View>
        <View className="chat-message">
          <View className="flex items-end">
            <View className="order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 text-xs">
              <View>
                <Text className="inline-block rounded-lg rounded-bl-none bg-gray-300 px-4 py-2 text-gray-600">
                  Thanks for your message {chatUser.firstName}. I thought I'm
                  alone with this issue. Please, ? the issue to support it :)
                </Text>
              </View>
            </View>
            <Image
              source={MY_PROFILE_PHOTO} //"https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              className="order-1 h-6 w-6 rounded-full"
            />
          </View>
        </View>
        <View className="chat-message">
          <View className="flex items-end justify-end">
            <View className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-xs">
              <View>
                <Text className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white ">
                  Are you using sudo?
                </Text>
              </View>
              <View>
                <Text className="inline-block rounded-lg rounded-br-none bg-blue-600 px-4 py-2 text-white ">
                  Run this command sudo chown -R `whoami` /Users/
                  {/* {{}}/.npm-global/ then install the package globally without */}
                  using sudo
                </Text>
                <Image
                  source={chatUser.imageSource} //"https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  className="order-2 h-6 w-6 rounded-full"
                />
              </View>
            </View>
          </View>
        </View>
        <View className="chat-message">
          <View className="flex items-end">
            <View className="order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 text-xs">
              <View>
                <Text className="inline-block rounded-lg bg-gray-300 px-4 py-2 text-gray-600">
                  It seems like you are from Mac OS world. There is no /Users/
                  folder on linux ?
                </Text>
              </View>
              <View>
                <Text className="inline-block rounded-lg rounded-bl-none bg-gray-300 px-4 py-2 text-gray-600">
                  I have no issue with any other packages installed with root
                  permission globally.
                </Text>
              </View>
            </View>
            <Image
              source={MY_PROFILE_PHOTO} //"https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              className="order-1 h-6 w-6 rounded-full"
            />
          </View>
        </View>
        <View className="chat-message">
          <View className="flex items-end justify-end">
            <View className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-xs">
              <View>
                <Text className="inline-block rounded-lg rounded-br-none bg-blue-600 px-4 py-2 text-white ">
                  yes, I have a mac. I never had issues with root permission as
                  well, but this helped me to solve the problem
                </Text>
                <Image
                  source={chatUser.imageSource} //"https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  className="order-2 h-6 w-6 rounded-full"
                />
              </View>
            </View>
          </View>
        </View>
        <View className="chat-message">
          <View className="flex items-end">
            <View className="order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 text-xs">
              <View>
                <Text className="inline-block rounded-lg bg-gray-300 px-4 py-2 text-gray-600">
                  I get the same error on Arch Linux (also with sudo)
                </Text>
              </View>
              <View>
                <Text className="inline-block rounded-lg bg-gray-300 px-4 py-2 text-gray-600">
                  I also have this issue, Here is what I was doing until now:
                  #1076
                </Text>
              </View>
              <View>
                <Text className="inline-block rounded-lg rounded-bl-none bg-gray-300 px-4 py-2 text-gray-600">
                  even i am facing
                </Text>
              </View>
            </View>
            <Image
              source={MY_PROFILE_PHOTO} //"https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              className="order-1 h-6 w-6 rounded-full"
            />
          </View>
        </View>
      </View>
      <View className="mb-2 border-t-2 border-gray-200 px-4 pt-4 sm:mb-0">
        <View className="relative flex">
          <Text className="absolute inset-y-0 flex items-center">
            <Button className="inline-flex h-12 w-12 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </Button>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatBody;
