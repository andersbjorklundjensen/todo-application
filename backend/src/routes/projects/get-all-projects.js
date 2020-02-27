

module.exports = async (ctx) => {
  
  const usersProjects = await ctx.mongo.models.projects
    .find({ ownerId: ctx.state.userId }).lean();


  const projectPromises = usersProjects
    .map((project) => ctx.mongo.models.todos.find({ ownerId: ctx.state.userId, projectId: project._id }).lean());

  const todos = await Promise.all(projectPromises);
  
  const formattedProjects = usersProjects.map((project, index) => ({

      projectId: project._id,
      projectName: project.name,
      projectTodos: todos[index]

  }));

  ctx.body = {
    projects: formattedProjects
  };

};
