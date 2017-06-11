/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ===== LODASH ================================================================
import castArray from 'lodash/castArray';

// ===== MESSENGER =============================================================
import api from './api';
import messages from './messages';

import imgflip from "./imgflip";

// Turns typing indicator on.
const typingOn = (recipientId) => {
  return {
    recipient: {
      id: recipientId,
    },
    sender_action: 'typing_on', // eslint-disable-line camelcase
  };
};

// Turns typing indicator off.
const typingOff = (recipientId) => {
  return {
    recipient: {
      id: recipientId,
    },
    sender_action: 'typing_off', // eslint-disable-line camelcase
  };
};

// Wraps a message JSON object with recipient information.
const messageToJSON = (recipientId, messagePayload) => {
  return {
    recipient: {
      id: recipientId,
    },
    message: messagePayload,
  };
};

// Send one or more messages using the Send API.
const sendMessage = (recipientId, messagePayloads) => {
  const messagePayloadArray = castArray(messagePayloads)
    .map((messagePayload) => messageToJSON(recipientId, messagePayload));

  api.callMessagesAPI([
    typingOn(recipientId),
    ...messagePayloadArray,
    typingOff(recipientId),
  ]);
};

// Send a message displaying the gifts a user can choose from.
const sendChooseGiftMessage = (recipientId, type, text) => {

  imgflip.image_url(type,text,function(err,url){
    if(err==null){
      sendMessage(recipientId,url);
    }
  })

};

// Send a message that a users preffered gift has changed.
const sendGiftChangedMessage = (recipientId) =>
  sendMessage(recipientId, messages.giftChangedMessage(recipientId));

export default {
  sendMessage,
  sendReadReceipt,
  sendHelloRewardMessage,
  sendPreferencesChangedMessage,
  sendChooseGiftMessage,
  sendGiftChangedMessage,
};
