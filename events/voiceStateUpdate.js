module.exports = {
	name: 'voiceStateUpdate',
	once: false,
	execute: async function(client) {
		const { cor , consoleServer , erro, suporte, relatorio, terminal, servidor} = Config(client);

    const newUserChannel = newMember.channelId;
    const oldUserChannel = oldMember.channelId;
 
    const canal = client.channels.cache.get(newUserChannel);
    const canalAnterior = client.channels.cache.get(oldUserChannel);
    const membro = servidor.members.cache.get(newMember.id);

    let equipeSuporte = servidor.members.cache.filter(member => member.roles.cache.has('878761418067963984') && member.presence?.status == 'online').size;
  

    const suporteEmbed = new MessageEmbed()
    .setTitle(`${membro.displayName} solicitou suporte`)
    .setColor(cor)
    .setDescription(`${membro} Entrou no canal de suporte`)
    .setTimestamp()
    .setThumbnail(membro.user.displayAvatarURL())
    const confirmEmbed = new MessageEmbed()
    .setTitle(`<:bytejr:877660498437496882> Bem vindo ao canal de suporte`)
    .setColor(cor)
    .setTimestamp()
    .setFooter({text:'Você também pode pedir ajudar por texto, é só enviar por aqui mesmo. '})

    if(oldUserChannel == newUserChannel) return;

    if((!oldUserChannel && newUserChannel) || oldUserChannel && newUserChannel){
        if(canal.id != '893466235239563274' || membro.roles.cache.has("878761418067963984"))return

        if(equipeSuporte >= 1){
            confirmEmbed.setDescription(
            `\`\`\` Olá ${membro.displayName}, tem ${equipeSuporte} membro(s) da equipe de suporte online, por favor aguarde no canal. \`\`\` `
            )
        }
        else{
            confirmEmbed.setDescription(`${membro.displayName} Infelizmente não tem ninguem da equipe de suporte online no momento, mas você pode deixar sua duvida por aqui, assim que alguem entrar online eu te aviso. `)
        }
        await membro.send({embeds: [confirmEmbed]});
        await consoleServer.send({content:`${suporte}`,embeds: [suporteEmbed]});
    
    }
    else if(oldUserChannel && !newUserChannel && !membro.roles.cache.has("878761418067963984")){
        if(canalAnterior.id != '893466235239563274' || membro.roles.cache.has("878761418067963984"))return
        suporteEmbed.setTitle(`${membro.displayName} encerrou o suporte`)
        suporteEmbed.setDescription(`${membro} saiu do canal de suporte`)

        confirmEmbed.setTitle(`<:bytejr:877660498437496882> ${membro.displayName} pode me dar um feedback ?`)
        confirmEmbed.setDescription(' \`\`\` vi que você saiu do canal de suporte, seus problemas foram resolvidos? recebeu ajuda?   \`\`\` ')
        confirmEmbed.setFooter('Seu feedback é muito importante.')
        consoleServer.send({embeds: [suporteEmbed]});
        membro.send({embeds: [confirmEmbed]});
    }  
	}
}