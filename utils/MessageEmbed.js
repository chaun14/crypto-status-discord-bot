// from https://github.com/Skillz4Killz/helperis/blob/master/src/MessageEmbed.ts

const embedLimits = {
  title: 256,
  description: 2048,
  fieldName: 256,
  fieldValue: 1024,
  footerText: 2048,
  authorName: 256,
  fields: 25,
  total: 6000,
};

class MessageEmbed {
  /** The amount of characters in the embed. */
  currentTotal = 0;
  /** Whether the limits should be enforced or not. */
  enforceLimits = true;
  /** If a file is attached to the message it will be added here. */
  file;

  /** The code that will be sent to discord for this embed. */
  code = {
    color: 0x9534eb,
    fields: [],
  };

  constructor(enforceLimits = true) {
    // By default we will always want to enforce discord limits but this option allows us to bypass for whatever reason.
    if (!enforceLimits) this.enforceLimits = false;

    return this;
  }

  fitData(data, max) {
    // If the string is bigger then the allowed max shorten it.
    if (data.length > max) data = data.substring(0, max);
    // Check the amount of characters left for this embed
    const availableCharacters = embedLimits.total - this.currentTotal;
    // If it is maxed out already return empty string as nothing can be added anymore
    if (!availableCharacters) return ``;
    // If the string breaks the maximum embed limit then shorten it.
    if (this.currentTotal + data.length > embedLimits.total) return data.substring(0, availableCharacters);
    // Return the data as is with no changes.
    return data;
  }

  setAuthor(name, icon, url) {
    const finalName = this.enforceLimits ? this.fitData(name, embedLimits.authorName) : name;
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.code.author = { name: finalName, icon_url: icon, url };

    return this;
  }

  setColor(color) {
    this.code.color =
      color.toLowerCase() === `random`
        ? // Random color
          Math.floor(Math.random() * (0xffffff + 1))
        : // Convert the hex to a acceptable color for discord
          parseInt(color.replace("#", ""), 16);

    return this;
  }

  setDescription(description) {
    this.code.description = this.fitData(description, embedLimits.description);

    return this;
  }

  addField(name, value, inline = false) {
    if (this.code.fields.length >= 25) return this;

    this.code.fields.push({
      name: this.fitData(name, embedLimits.fieldName),
      value: this.fitData(value, embedLimits.fieldValue),
      inline,
    });

    return this;
  }

  addBlankField(inline = false) {
    return this.addField("\u200B", "\u200B", inline);
  }

  attachFile(file, name) {
    this.file = {
      file,
      name,
    };
    this.setImage(`attachment://${name}`);

    return this;
  }

  setFooter(text, icon) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.code.footer = { text: this.fitData(text, embedLimits.footerText), icon_url: icon };

    return this;
  }

  setImage(url) {
    this.code.image = { url };

    return this;
  }

  setTimestamp(time = Date.now()) {
    this.code.timestamp = new Date(time).toISOString();

    return this;
  }

  setTitle(title, url) {
    this.code.title = this.fitData(title, embedLimits.title);
    if (url) this.code.url = url;

    return this;
  }

  setThumbnail(url) {
    this.code.thumbnail = { url };

    return this;
  }
}

module.exports = MessageEmbed;
