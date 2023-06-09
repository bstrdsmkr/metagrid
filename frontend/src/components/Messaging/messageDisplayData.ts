import { StartPopupData, MessageTemplates, MarkdownMessage } from './types';

export const rightDrawerMessages: MarkdownMessage[] = [
  { title: 'Messages', fileName: 'messages/metagrid_messages.md' },
];

export const rightDrawerChanges: MarkdownMessage[] = [
  { title: 'V1.0.8', fileName: 'changelog/v1.0.8-beta.md' },
  { title: 'V1.0.7', fileName: 'changelog/v1.0.7-beta.md' },
];

const startupMessages: StartPopupData = {
  messageToShow: 'v1.0.8-beta',
  defaultMessageId: 'welcome',
  messageData: [
    {
      messageId: 'v1.0.8-beta',
      template: MessageTemplates.ChangeLog,
      style: { minWidth: '700px' },
      data: {
        changesFile: 'changelog/v1.0.8-beta.md',
        version: '1.0.8 Beta',
      },
    },
    {
      messageId: 'v1.0.7-beta',
      template: MessageTemplates.ChangeLog,
      data: {
        changesFile: 'changelog/v1.0.7-beta.md',
        version: '1.0.7 Beta',
      },
    },
    {
      messageId: 'welcome',
      template: MessageTemplates.Welcome,
      data: {
        welcomeMessage:
          "If you wish to become familiar with Metagrid's search and download features, we recommend checking out the interface tours below:",
      },
    },
  ],
};

export default startupMessages;