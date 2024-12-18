function ChatScrollbar() {
  return (
    <div className="my-auto w-full overflow-y-scroll">
      <div className="relative flex flex-col mx-4 ">
        <div className="absolute -left-4 top-5 w-5 h-5 bg-secondary rounded-full mr-4 z-10"></div>
        <article className=" mx-auto rounded-lg py-4 ml-4 z-10">
          Hey there, friend! 🌟 I’m CapyNion, your loyal capybara companion. How
          are you feeling today? Pick one of the options below, and let’s make
          today a little brighter together!
        </article>
        <button className="bg-container-secondary rounded-xl p-2 my-2 ml-4 max-w-xs text-left">
          🌈 Explore Stress-Coping Strategies
        </button>
        <button className="bg-container-secondary rounded-xl p-2 my-2 ml-4 max-w-xs text-left">
          💪🏻 Encourage with Motivation
        </button>
        <button className="bg-container-secondary rounded-xl p-2 my-2 ml-4 max-w-xs text-left">
          💬 I Just Want to Chat
        </button>
      </div>
    </div>
  );
}

export default ChatScrollbar;
