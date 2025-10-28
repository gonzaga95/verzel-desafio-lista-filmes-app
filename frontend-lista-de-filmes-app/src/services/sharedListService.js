import { api } from './api.js';
import { getUserId } from '../utils/userIdStorage.js';

export const sharedListService = {
  getOrCreateShareLink: listName =>
    api.post(
      '/shared-lists/create-link',
      { listName: listName },
      {
        headers: { 'X-User-ID': getUserId() },
      }
    ),

  toggleShareStatus: isActive =>
    api.patch(
      '/shared-lists/toggle-share-status',
      { isActive: isActive },
      {
        headers: { 'X-User-ID': getUserId() },
      }
    ),

  updateSharedListName: listName =>
    api.patch(
      '/shared-lists/update-name',
      { listName: listName },
      {
        headers: { 'X-User-ID': getUserId() },
      }
    ),

  getSharedList: shareToken => api.get(`/shared-lists/${shareToken}`),
};
