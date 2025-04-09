import { CommandInteraction } from "@dressed/dressed";

export default function helloCommand(interaction: CommandInteraction) {
    interaction.reply(`Hello, ${interaction.user.global_name}!`);
}
