function isTitleTagNode(node) {
  return node.type === "Tag" && node.name === "title";
}

function isNonEmptyTextNode(node) {
  return node.type === "Text" && node.value.trim().length > 0;
}

const checkTitle = (context) => {
  return {
    Tag(node) {
      if (node.name !== "head") {
        return;
      }

      const titleTag = node.children.find(isTitleTagNode);

      if (!titleTag) {
        context.report(node, "Отсутствует title на странице");
        return;
      }

      if (isTitleTagNode(titleTag)) {
        const titleContentText = titleTag.children.find(isNonEmptyTextNode);

        if (!titleContentText.value.includes("Уголок фронтендера")) {
          context.report(
            node,
            "В заголовке страницы не найдено название канала",
          );
        }
      }
    },
  };
};

module.exports = { checkTitle };
