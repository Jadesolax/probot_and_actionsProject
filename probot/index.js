module.exports = (app) => {
    app.on('pull_request.opened', async context => {
      const pr = context.payload.pull_request;
      const branch = pr.head.ref;
      const repo = context.payload.repository.name;
      const owner = context.payload.repository.owner.login;
  
      // Create a unique container for the PR
      const deployUrl = `http://${branch}.yourdomain.com`;
      await deployContainer(branch);
  
      // Comment on the PR with the deployment URL
      const comment = context.issue({ body: `Deployment URL: ${deployUrl}` });
      return context.octokit.issues.createComment(comment);
    });
  
    app.on('pull_request.closed', async context => {
      const branch = context.payload.pull_request.head.ref;
      await removeContainer(branch);
    });
  
    app.on('push', async context => {
      const branch = context.payload.ref.replace('refs/heads/', '');
      const repo = context.payload.repository.name;
      const owner = context.payload.repository.owner.login;
  
      if (context.payload.pull_request) {
        await updateContainer(branch);
      }
    });
  
    async function deployContainer(branch) {
      // Implement Docker container deployment logic
    }
  
    async function updateContainer(branch) {
      // Implement Docker container update logic
    }
  
    async function removeContainer(branch) {
      // Implement Docker container removal logic
    }
  };
  




// const { Probot } = require('probot');

// module.exports = (app) => {
//   app.on(['pull_request.opened', 'pull_request.synchronize'], async (context) => {
//     const { number, head } = context.payload.pull_request;
//     const status = `Deployed PR #${number} to http://your-server-url/pr-${number}`;

//     await context.octokit.issues.createComment(context.issue({ body: status }));
//   });

//   app.on('pull_request.closed', async (context) => {
//     const { number } = context.payload.pull_request;
//     const status = `Cleaned up deployment for PR #${number}`;

//     await context.octokit.issues.createComment(context.issue({ body: status }));
//   });
// };
