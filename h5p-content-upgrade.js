var counter = 0;

H5PAdminIntegration.libraryList.listData.some(function(lib) {
  if (lib.numContent > 0 && lib.upgradeUrl !== false) {
    counter++;
    window.open(`${window.location.origin}${lib.upgradeUrl}`, '_blank');

    //window.open(`${lib.upgradeUrl}`, '_blank');
  }

  return (counter >= 10);
});
