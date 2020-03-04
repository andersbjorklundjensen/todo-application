module.exports = async (ctx) => {
  const usersProjects = await ctx.mongo.models.projects
    .find({ ownerId: ctx.state.userId })
    .lean();

  const formattedProjects = usersProjects.map((project) => ({

    id: project._id,
    name: project.name,

  }));

  ctx.body = {
    projects: formattedProjects,
  };
};
