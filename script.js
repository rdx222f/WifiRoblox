async function buscarUsuario(){
  const input = document.getElementById("userInput").value;
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "⏳ Reconectando wifi...";

  let userId;

  if(isNaN(input)){
    const res = await fetch("https://users.roblox.com/v1/usernames/users",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ usernames:[input] })
    });
    const data = await res.json();
    if(!data.data.length){
      resultado.innerHTML="❌ Usuario no encontrado";
      return;
    }
    userId = data.data[0].id;
  }else{
    userId = input;
  }

  const user = await fetch(`https://users.roblox.com/v1/users/${userId}`).then(r=>r.json());
  const avatar = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=true`;

  resultado.innerHTML = `
    <img src="${avatar}">
    <p><b>Nombre:</b> ${user.name}</p>
    <p><b>Display:</b> ${user.displayName}</p>
    <p><b>ID:</b> ${user.id}</p>
    <p><b>Creado:</b> ${new Date(user.created).toLocaleDateString()}</p>
    <h3>😂 Este usuario le aparecerá<br>“Reconectar de wifi”</h3>
  `;
}
