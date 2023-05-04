//autoload
window.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadPosts();
  }
});

function loadPosts() {
  let loadMoreButton = document.querySelector(".DiscussionList-loadMore button");
  if (loadMoreButton) {
    loadMoreButton.click();
  }
}

//7tv emotes

let isEmotesBoxOpen = false;

function toggleEmotesBox(button) {
  if (isEmotesBoxOpen) {
    const emotesBox = document.querySelector(".floating-container");
    emotesBox.remove();
    isEmotesBoxOpen = false;
  } else {
    const emotesBox = document.createElement("div");
    emotesBox.className = "floating-container";
    emotesBox.style.width = "300px";
    emotesBox.style.height = "400px";
    emotesBox.style.backgroundColor = "black";
    emotesBox.style.position = "fixed";
    emotesBox.style.zIndex = "9999";
    emotesBox.style.bottom = "0px";
    emotesBox.style.overflow = "auto";

    const composerContent = document.querySelector(".Composer-content");
    const composerRect = composerContent.getBoundingClientRect();
    emotesBox.style.right = `${document.documentElement.clientWidth - composerRect.right}px`;
    composerContent.appendChild(emotesBox);

    isEmotesBoxOpen = true;

    const emotesList = document.createElement("div");
    emotesList.id = "emotes-list";
    emotesList.style.display = "flex";
    emotesList.style.flexWrap = "wrap";
    emotesList.style.justifyContent = "space-between";
    emotesBox.appendChild(emotesList);

    fetch(`https://api.7tv.app/v3/emote-sets/64538f7035d9c537ccd2d78f`)
      .then((response) => response.json())
      .then((data) => {
        data = data['emotes'];
        data.forEach((emote) => {
          emote_id = emote['id'];
          emote_name = emote['name'];

          const emoteContainer = document.createElement("div");
          emoteContainer.style.height = "85px";
          emoteContainer.style.display = "inline-block";
          emoteContainer.style.maxWidth = "85px";
          emoteContainer.style.display = "flex";
          emoteContainer.style.alignItems = "center"; 

          const emoteImg = document.createElement("img");
          emoteImg.src = `https://cdn.7tv.app/emote/${emote_id}/4x.webp`;
          emoteImg.alt = emote_id;
          emoteImg.title = emote_name;
          emoteImg.style.maxWidth = "100%";
          emoteContainer.appendChild(emoteImg);   
          emotesList.appendChild(emoteContainer);

          emoteImg.onclick = function () {
            const textarea = document.querySelector('.TextEditor-editor');
            const altText = this.getAttribute('alt');
            textarea.value = textarea.value + "![](https://cdn.7tv.app/emote/" + altText + "/4x.webp)\n";
            textarea.dispatchEvent(new Event('input'));
          };
        });
      })
      .catch((error) => console.error(error));
  }
}

const observer = new MutationObserver(() => {
  const composer = document.querySelector(".TextEditor-toolbar");
  if (composer && !composer.querySelector(".emotes-button")) {
    const button = document.createElement("button");
    button.className = "Button Button--icon Button--link hasIcon emotes-button ";
    button.style.color = "red";
    button.innerHTML = '<i aria-hidden="true" class="icon fas fa-image "></i><span class="Button-label">Emotes</span>';
    button.onclick = () => {
      toggleEmotesBox(button);
    };
    composer.appendChild(button);
  }
});

observer.observe(document.body, { childList: true, subtree: true });

const observer2 = new MutationObserver(() => {
  const composer = document.querySelector(".TextEditor-toolbar");
  const emotesBox = document.querySelector(".floating-container");
  if (!composer && emotesBox) {
    emotesBox.remove();
    isEmotesBoxOpen = false;
  };
});

observer2.observe(document.body, { childList: true, subtree: true });



//css
const style = document.createElement('style');
style.innerHTML = `
  .floating-container::-webkit-scrollbar {
    width: 8px;
  }

  .floating-container::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
   
  .floating-container::-webkit-scrollbar-thumb {
    background: #888; 
  }

  .floating-container::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`;
document.head.appendChild(style);