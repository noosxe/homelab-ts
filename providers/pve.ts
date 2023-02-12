import * as pulumi from "@pulumi/pulumi";
import * as proxmox from "@muhlba91/pulumi-proxmoxve";

const config = new pulumi.Config();

export const pveProvider = new proxmox.Provider("proxmoxve", {
  virtualEnvironment: {
    endpoint: config.requireSecret("pveEndpoint"),
    insecure: true,
    username: config.requireSecret("pveUser"),
    password: config.requireSecret("pvePassword"),
  },
});
