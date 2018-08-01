#!/bin/sh
# Starts autossh on an instance using environment variable sets.
#
# Define a set to execute using autossh.
#
# An environment variable set consists of:
#
# - <NAME>_SSH_PUBLIC_KEY
# - <NAME>_SSH_PRIVATE_KEY
# - <NAME>_SSH_PORT_LOCAL
# - <NAME>_SSH_PORT_REMOVE
# - <NAME>_SSH_HOST
# - <NAME>_SSH_USER
#
# A shortened variable set consists of:
#
# - <NAME>_SSH_PUBLIC_KEY
# - <NAME>_SSH_PRIVATE_KEY
# - <NAME>_SSH_PORT
# - <NAME>_SSH_HOST
# - <NAME>_SSH_USER
#
# See https://elements.heroku.com/buildpacks/kollegorna/heroku-buildpack-autossh
main() {
	echo $0: creating public and private key files
	mkdir -p ${HOME}/.ssh
	chmod 700 ${HOME}/.ssh
	names_="$(env | grep _SSH_ | sed -e 's/_SSH_.*//g' | uniq)"
	read -r -a names <<< "$names_"
	for name in $names
	do
		set__autossh__keys
		start__autossh
	done
}
set__autossh__keys() {
	public_key__varname="${name}_SSH_PUBLIC_KEY"
	public_key="${!public_key__varname}"
	if [ ! "$public_key" ]; then clear__continue; fi

	private_key__varname="${name}_SSH_PRIVATE_KEY"
	private_key="${!private_key__varname}"
	if [ ! "$private_key" ]; then clear__continue; fi

	port__varname="${name}_SSH_PORT"
	local_port__varname="${name}_SSH_PORT_LOCAL"
	local_port="${!local_port__varname}"
	if [ ! "$local_port" ]; then
		local_port="${!port__varname}"
	fi
	if [ ! "$local_port" ]; then clear__continue; fi

	remote_port__varname="${name}_SSH_PORT_REMOTE"
	remote_port=${!remote_port__varname}
	if [ ! "$remote_port" ]; then
		remote_port="${!port__varname}"
	fi
	if [ ! "$remote_port" ]; then clear__continue; fi

	monitor_port__varname="${name}_SSH_PORT_MONITOR"
	monitor_port=${!monitor_port__varname}
	if [ ! "$monitor_port" ] && [ "$local_port" ]; then
		monitor_port="$local_port"
	fi
	if [ ! "$monitor_port" ]; then clear__continue; fi

	user__varname="${name}_SSH_USER"
	user=${!user__varname}
	if [ ! "$user" ]; then clear__continue; fi

	host__varname="${name}_SSH_HOST"
	host=${!host__varname}
	if [ ! "$host" ]; then clear__continue; fi
}
clear__continue() {
	clear__autossh__keys
	continue
}
clear__autossh__keys() {
	public_key=""
	private_key=""
	local_port=""
	remote_port=""
	monitor_port=""
	user=""
	host=""
}
start__autossh() {
	# Create the public and private key files from the environment variables.
	echo "${public_key}" > ${HOME}/.ssh/${name}_id_rsa.pub
	chmod 644 ${HOME}/.ssh/${name}_id_rsa.pub

	# Note use of double quotes, required to preserve newlines
	echo "${private_key}" > ${HOME}/.ssh/${name}_id_rsa
	chmod 600 ${HOME}/.ssh/${name}_id_rsa

	ssh-keyscan "$host" >> ${HOME}/.ssh/known_hosts

	# Start the SSH tunnel if not already running
	autossh \
		-f -N \
		-M "${monitor_port}" \
		-o "ServerAliveInterval=10" \
		-o "ServerAliveCountMax=3" \
		-i "${HOME}/.ssh/${name}_id_rsa" \
		-L "${local_port}:127.0.0.1:${remote_port}" \
		"${user}@${host}" \
		&
}
main $@