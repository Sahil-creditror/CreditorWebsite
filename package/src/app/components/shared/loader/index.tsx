
"use client";

import React from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  variant?: "spinner" | "dots" | "pulse" | "bounce" | "wave" | "bars";
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white" | "gray" | "blue" | "green" | "red";
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  variant = "spinner",
  size = "md",
  color = "primary",
  text,
  className = "",
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  const colorClasses = {
    primary: "border-indigo-600 dark:border-indigo-400",
    secondary: "border-gray-600 dark:border-gray-400",
    white: "border-white",
    gray: "border-gray-500 dark:border-gray-300",
    blue: "border-blue-600 dark:border-blue-400",
    green: "border-green-600 dark:border-green-400",
    red: "border-red-600 dark:border-red-400",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  const renderSpinner = () => (
    <motion.div
      className={`${sizeClasses[size]} rounded-full border-2 border-solid border-t-transparent ${colorClasses[color]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  const renderDots = () => (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${sizeClasses[size].split(" ")[0]} ${sizeClasses[size].split(" ")[1]} rounded-full bg-current`}
          style={{ color: colorClasses[color].split(" ")[0].replace("border-", "") }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <motion.div
      className={`${sizeClasses[size]} rounded-full bg-current ${className}`}
      style={{ color: colorClasses[color].split(" ")[0].replace("border-", "") }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );

  const renderBounce = () => (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${sizeClasses[size].split(" ")[0]} ${sizeClasses[size].split(" ")[1]} rounded-full bg-current`}
          style={{ color: colorClasses[color].split(" ")[0].replace("border-", "") }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const renderWave = () => (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className={`w-1 bg-current rounded-full`}
          style={{ 
            color: colorClasses[color].split(" ")[0].replace("border-", ""),
            height: size === "sm" ? "12px" : size === "md" ? "16px" : size === "lg" ? "20px" : "24px"
          }}
          animate={{
            scaleY: [1, 2, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const renderBars = () => (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className={`w-1 bg-current rounded-full`}
          style={{ 
            color: colorClasses[color].split(" ")[0].replace("border-", ""),
            height: size === "sm" ? "12px" : size === "md" ? "16px" : size === "lg" ? "20px" : "24px"
          }}
          animate={{
            scaleY: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      case "bounce":
        return renderBounce();
      case "wave":
        return renderWave();
      case "bars":
        return renderBars();
      default:
        return renderSpinner();
    }
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-3">
      {renderLoader()}
      {text && (
        <motion.p
          className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-300 font-medium`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default Loader;
