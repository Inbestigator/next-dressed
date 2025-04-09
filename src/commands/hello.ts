import { CommandInteraction } from "@dressed/dressed";

export default function helloCommand(interaction: CommandInteraction) {
    return interaction.reply(`Hello, ${interaction.user.global_name}!`);
}
