// Instance the tour
var tourInitial = new Tour({
 storage: false,
 backdrop: true,

 steps: [
    {
      element: "#nav1",
      title: "This is your <b>Navigation Bar</b>",
      content: "Content of my step"
    },
    {
      element: "#nav2",
      title: "Title of my step",
      content: "Content of my step",
      path: "#/sd/build"
    }
  ]
});
// Initialize the tour
tourInitial.init();

// Start the tour
tourInitial.start();
