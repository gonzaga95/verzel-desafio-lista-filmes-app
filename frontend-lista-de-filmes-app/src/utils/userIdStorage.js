const USER_ID_KEY = 'lista-filmes:user-id';

function generateUserId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function getUserId() {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = generateUserId();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}
