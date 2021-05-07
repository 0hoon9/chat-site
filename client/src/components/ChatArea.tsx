import React from 'react';
import dayjs from 'dayjs'; //moment.js 대체

import { Message } from '../utilities/types';

export interface Props {
  messages: Message[];
  messageInput: string;
  handleSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ChatArea: React.FC<Props> = ({ messages, messageInput, handleSubmitForm, handleChangeInput }) => {
  return (
    <div className='flex-1 w-full bg-gray-100'>
      <div className='flex flex-col chatarea'>
        <div className='flex-1 overflow-y-auto p-6 flex flex-col-reverse'>
          {messages.map((message, i) => (
            <div key={`${message.author}-${message.date}-${i}`} className='mb-3 p-2'>
              <div className='flex items-center mb-2'>
                <span className='font-bold text-gray-700 text-lg mr-4'>{message.author}</span>
                <span className='text-sm text-gray-400'>{dayjs(message.date).format('h:mm A')}</span>
              </div>
              <p className='text-gray-800'>{message.content}</p>
            </div>
          ))}
        </div>
        <div className='flex-none pb-4 px-4'>
          <form onSubmit={handleSubmitForm}>
            <input
              type='text'
              name='messageInput'
              value={messageInput}
              onChange={handleChangeInput}
              className='w-full p-3 placeholder-gray-300 border border-gray-200 rounded-md shadow-md focus:outline-none focus:border-blue-light'
              placeholder='작성중..'
            />
            <button className='submit -ml-20 pb-3 px-7 py-1 border-gray-200 rounded-md shadow-md text-white bg-blue font-bold text-2xl'>
              <i className='fas fa-envelope'></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
