const fs = require('fs');
const path = require('path');

const functions = [
  'getBoardState', 'markNotificationRead', 'getProfile', 'updateProfile',
  'blockUser', 'respondToFriendRequest', 'reportUser', 'createSession',
  'saveMatch', 'addMessage', 'createFriendRequest', 'registerUser',
  'createTask', 'toggleBucketCollapsed', 'toggleTaskCompletion', 'toggleSubtask',
  'deleteSession', 'getUserBySession'
];

const files = [
  'app/api/notifications/[id]/route.ts',
  'app/api/profile/route.ts',
  'app/api/users/block/route.ts',
  'app/api/friend-requests/[id]/route.ts',
  'app/api/users/report/route.ts',
  'app/api/auth/login/route.ts',
  'app/api/matches/save/route.ts',
  'app/api/bootstrap/route.ts',
  'app/api/messages/route.ts',
  'app/api/friend-requests/route.ts',
  'app/api/auth/register/route.ts',
  'app/api/tasks/route.ts',
  'app/api/buckets/route.ts',
  'app/api/tasks/[id]/toggle/route.ts',
  'app/api/tasks/[id]/subtasks/[index]/route.ts',
  'lib/auth.ts'
];

files.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  functions.forEach(func => {
    // Look for `func(` not preceded by `await ` or `function `
    const regex = new RegExp(`(?<!await\\s)(?<!function\\s)(?<!import\\s\\{[^}]*)${func}\\(`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `await ${func}(`);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
