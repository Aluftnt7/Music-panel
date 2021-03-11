import React from "react";

export default ({ isDeleting }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={isDeleting ? "remove-song-icon deleting" : "remove-song-icon"}
    >
      <g>
        <path d="m12 2.5c-5.24671 0-9.5 4.25329-9.5 9.5 0 5.2467 4.25329 9.5 9.5 9.5.4848 0 .9609-.0363 1.4256-.1062.2731-.0411.5278.147.5688.4201.0411.273-.147.5277-.42.5688-.5139.0773-1.0396.1173-1.5744.1173-5.79899 0-10.5-4.701-10.5-10.5 0-5.79899 4.70101-10.5 10.5-10.5 5.799 0 10.5 4.70101 10.5 10.5 0 1.292-.2336 2.5305-.6612 3.675-.0967.2587-.3848.39-.6434.2934-.2587-.0967-.39-.3847-.2934-.6434.3865-1.0342.598-2.1543.598-3.325 0-5.24671-4.2533-9.5-9.5-9.5z" />
        <path d="m21.5 19.5c0 .2761-.2239.5-.5.5h-4c-.2761 0-.5-.2239-.5-.5s.2239-.5.5-.5h4c.2761 0 .5.2239.5.5z" />
        <path d="m10.2572 8.57125c-.1544-.09268-.34679-.0951-.50355-.00635-.15675.08875-.25365.25496-.25365.4351v6c0 .1801.0969.3463.25365.4351.15676.0888.34915.0863.50355-.0064l5-3c.1507-.0903.2428-.2531.2428-.4287s-.0921-.3384-.2428-.4287zm3.771 3.42875-3.5282 2.1169v-4.23381z" />
      </g>
    </svg>
  );
};