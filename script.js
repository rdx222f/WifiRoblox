async function buscar(){
  const name = document.getElementById("username").value;
  const card = document.getElementById("card");
  const loader = document.getElementById("loader");
  const sound = document.getElementById("sound");

  card.innerHTML = "";
  loader.classList.remove("hidden");
  sound.play();

  const search = await fetch("https://users.roblox.com/v1/users/search?keyword="+name)
  .then(r=>r.json());

  if(!search.data.length){
    loader.innerHTML="❌ Usuario no encontrado";
    return;
  }

  const id = search.data[0].id;

  const user = await fetch(`https://users.roblox.com/v1/users/${id}`)
  .then(r=>r.json());

  const inv = await fetch(`https://inventory.roblox.com/v1/users/${id}/can-view-inventory`)
  .then(r=>r.json());

  const avatar = await fetch(
    `https://thumbnails.roblox.com/v1/users/avatar?userIds=${id}&size=720x720&format=Png&isCircular=false`
  ).then(r=>r.json());

  loader.classList.add("hidden");

  const banned = user.isBanned;
  document.querySelector(".container").classList.toggle("red", banned);

  card.innerHTML = `
  <div class="card">
    <img src="${avatar.data[0].imageUrl}">
    <p><b>${user.name}</b> (${user.displayName})</p>
    <p>🆔 ${id}</p>
    <p>📅 Creado: ${user.created.split("T")[0]}</p>
    <p>📝 ${user.description || "Sin descripción"}</p>
    <p>✔ Verificado: ${user.hasVerifiedBadge}</p>
    <p>🎒 Inventario visible: ${inv.canView}</p>
    <h3>😂 Este usuario le aparecerá<br>“Reconectar de wifi”</h3>
  </div>`;
}
