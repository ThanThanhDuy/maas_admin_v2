export const confirmDeleteDialog = (root, title, content, ok, cancel) => {
  root.$confirm({
    title,
    content,
    okType: "danger",
    okText: "Yes",
    cancelText: "No",
    onOk() {
      ok();
    },
    onCancel() {
      cancel();
    },
  });
};
