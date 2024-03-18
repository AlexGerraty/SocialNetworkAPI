const users = [
    {
      username: 'alex',
      email: 'alex@example.com',
      thoughts: [],
      friends: [],
    },
    {
      username: 'jacob',
      email: 'jacob@example.com',
      thoughts: [],
      friends: [],
    },
    {
      username: 'lauren',
      email: 'lauren@example.com',
      thoughts: [],
      friends: [],
    },
  ];
  
  const thoughts = [
    {
      thoughtText: 'I love coding!',
      username: 'alex',
      reactions: [],
    },
    {
      thoughtText: 'I need to start exercising more...',
      username: 'jacob',
      reactions: [],
    },
    {
      thoughtText: 'I can\'t wait for summer!',
      username: 'lauren',
      reactions: [],
    },
  ];
  
  const reactions = [
    {
      reactionBody: 'Keep up the good work!',
      username: 'jacob',
      thoughtId: thoughts[0]._id,
    },
    {
      reactionBody: 'You can do it!',
      username: 'lauren',
      thoughtId: thoughts[1]._id,
    },
  ];