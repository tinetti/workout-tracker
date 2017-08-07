#!/usr/bin/env bash

set -e

# set up VirtualBox port-forwarding
function vbox_port_forward() {
    local name=$1
    local host_port=$2
    local vm_port=$3
    local rule_name=tcp-mario-${name}
    local rule="${rule_name},tcp,,${host_port},,${vm_port}"

    local current_rule=$(VBoxManage showvminfo minikube --machinereadable | grep "Forwarding(.*)=\".*,,${host_port},,.*\"" | awk -F '[",]' '{print $2}')
    if [[ -z "$current_rule" ]]; then
        echo "exposing $name on localhost:$host_port"
        VBoxManage controlvm minikube natpf1 "$rule"
    else
        echo -n "$name already exposed on localhost:$host_port ... Do you want to re-map this port? (y/N) "
        read answer
        if [[ "$answer" == "y" || "$answer" == "Y" ]]; then
            VBoxManage controlvm minikube natpf1 delete "$current_rule"
            VBoxManage controlvm minikube natpf1 "$rule"
        fi
    fi
}

vbox_port_forward workout-tracker-mongo 27017 27017
