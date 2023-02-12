import * as pulumi from "@pulumi/pulumi";
import * as proxmox from "@muhlba91/pulumi-proxmoxve";

import { pveProvider } from "./providers";

const config = new pulumi.Config();

const PVE_NODE = config.requireSecret("pveNode");

const virtualMachine = new proxmox.vm.VirtualMachine(
  "test-vm",
  {
    nodeName: PVE_NODE,
    agent: {
      enabled: false,
      trim: true,
      type: "virtio",
    },
    clone: {
      nodeName: PVE_NODE,
      vmId: 9000,
      full: true,
    },
    name: "test-vm",
    vmId: 500,
  },
  {
    provider: pveProvider,
  }
);
