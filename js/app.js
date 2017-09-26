"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

class App {
      constructor() {
        this.result = {
          videos: [],
          selectedVideo: null,
          searchTerm: ""
        };
      }

      init() {
        this.youtubeSearch("platzi");
        $("#btnSearch").click( () => this.videoName());
      }

      getVideoList(videos) {
        return videos.map((video, index) => {
           const imageUrl = video.snippet.thumbnails.default.url;
           const url = `https://www.youtube.com/embed/${video.id.videoId}`;
           return `<li>
                       <p>
                          <iframe class="embed-responsive-item col-md-9" src=${url}> </iframe>
                       </p>
                       <img class="media-object col-md-3" src=${imageUrl} />
                 </li>`;
            });
      }

      youtubeSearch(searchTerm) {

            YTSearch({ key: API_KEY, term: searchTerm }, data => {
                  this.result = {
                    videos: data,
                    selectedVideo: data[0],
                    searchTerm: searchTerm
                  };
                  console.log(this.result.videos);
                  var list = this.getVideoList(this.result.videos);
                  $("#root").append(list);
            });

      }
      videoName() {
        this.youtubeSearch($('#video').val());
        $('#video').html("");
        $("#root").html("");
      }

      videoSearch(searchTerm) {
            jQuery.getJSON("list.json", data => {
                  this.result = {
                        videos: data.items,
                        selectedVideo: data.items[0],
                        searchTerm: searchTerm
                  };
                  var list = this.getVideoList(this.result.videos);
                  $("#root").append(list);
            });
      }
};

$(document).ready(() => {
      let videos = new App();
      videos.init();
});
