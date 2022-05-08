// IMPORTS

// CONSTS
const localUser = JSON.parse(localStorage.getItem('Means_userLogued'))

const backgroundProfileCreatePost = document.getElementById("topCreate")
const imgProfileCreatePost = document.getElementById("createImg")

const div = document.getElementById("divPost");
const divMasInfoPost = document.getElementById("divMasInfoPost");

// EVENT LISTENERS
document.getElementById("btnPublicar2").addEventListener("click", e => {
    e.preventDefault();
    createPost();
})

document.getElementById(".imgCat").addEventListener("click", e => {
    e.preventDefault();
    img = e.target;
    alert("img elegida");
    alert(img.src)
})

// FUNCTIONS
viewPosts()
if (localUser) loadUser()

async function viewPosts() {
    // deleteInfo()
    const post = await RequestHandler.getDefault("http://localhost:8085/post/")
    if (post) await post.forEach(e => { getAllPost(e) });
}

async function getAllPost(post) {
    //  let totalPeople = 0
    // post.people.forEach(e => { totalPeople += e.count });
    
    const userPost = await RequestHandler.getDefault("http://localhost:8085/users/" + post.idUser)

    let postCard = `
    <div class="cardPost">
        <div class="postImage">
            <img src="https://www.eventsforce.com/wp-content/uploads/2018/01/onboarding.jpg">
        </div>
        <div class="postBody">
            <div class="postBodyLeft">
                <div id="postBodyLeftTop">
                    <div class="postUser">
                        <img id="iconUser" src="${ userPost.icono }">
                        <img id="insUser" src="${ userPost.insignias[0] }">
                    </div>
                    <p id="titlePost">${ post.name }</p>
                </div> 
                <p id="textPost">${ post.smallDescription }</p>
                <button id="moreInfoPost">Más Información</button>
            </div>
            <div class="postBodyRight">
                <div class="postBodyRightTop">
                    <div>
                        <img src="https://api.iconify.design/uil/favorite.svg?color=%23ffd600">
                        <img src="https://api.iconify.design/bi/chat-square-dots-fill.svg?color=%23514f4f">
                    </div>
                </div>
                <div class="postBodyRightBot">
                    <div class="postBodyRightBotDiv">
                        <img src="https://api.iconify.design/healthicons/money-bag.svg?color=%23514f4f">
                        <p>${ post.money }</p>
                    </div>
                    <div class="postBodyRightBotDiv">
                        <img src="https://api.iconify.design/fluent/people-20-filled.svg?color=%23514f4f" >
                        <p>${ 0 }</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    divPost.innerHTML += postCard

    document.getElementById("moreInfoPost").addEventListener("click", e=>{
        e.preventDefault();
        // masInfoPost();
    })
}

function loadUser() {
    // Background Create Post Profile
    backgroundProfileCreatePost.style.backgroundImage = 'linear-gradient(' + localUser.backgroundProfile[0] + ', ' + localUser.backgroundProfile[1] + ')'

    // Image Create Post Profile
    imgProfileCreatePost.src = localUser.icono ? localUser.icono : "../Imagenes/Pics/hombre.png"
}